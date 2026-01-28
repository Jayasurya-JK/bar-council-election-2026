import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

export interface LawyerRecord {
    EnrollmentNo: string;
    Name: string;
    Gender: string;
    FatherName: string;
    BarAssociation: string;
    Location: string;
}

let cachedData: LawyerRecord[] | null = null;

function loadCSVData(): LawyerRecord[] {
    if (cachedData) return cachedData;

    const csvPath = path.join(process.cwd(), 'data.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');

    // CSV has NO header row and uses TAB delimiter
    const result = Papa.parse(fileContent, {
        header: false,
        delimiter: '\t',
        skipEmptyLines: true,
    });

    cachedData = result.data
        .map((row: any) => ({
            EnrollmentNo: (row[0] || '').toString().trim(),
            Name: (row[1] || '').toString().trim(),
            Gender: (row[2] || '').toString().trim(),
            FatherName: (row[3] || '').toString().trim(),
            BarAssociation: (row[4] || '').toString().trim(),
            Location: (row[5] || '').toString().trim(),
        }))
        .filter(row => row.EnrollmentNo && row.Name);

    console.log(`✅ CSV loaded: ${cachedData.length} records`);
    return cachedData;
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q')?.trim().toLowerCase();
        const type = searchParams.get('type') || 'enrollment'; // 'enrollment' or 'name'

        if (!query) {
            return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
        }

        const data = loadCSVData();

        let results: LawyerRecord[];

        if (type === 'enrollment') {
            const exactMatch = data.find(
                record => record.EnrollmentNo.toLowerCase() === query
            );
            results = exactMatch ? [exactMatch] : [];
        } else {
            // Name search - return up to 10 matches
            results = data
                .filter(record => record.Name.toLowerCase().includes(query))
                .slice(0, 10);
        }

        return NextResponse.json({
            results,
            total: results.length
        });

    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json(
            { error: 'Failed to search records' },
            { status: 500 }
        );
    }
}
