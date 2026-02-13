import * as fs from 'fs';
import * as path from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FileReaderService {

  readAssessmentFile(fileName: string) {
    const filePath = path.join(process.cwd(), 'assessment', fileName);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(
        `Assessment file not found: ${fileName}`,
      );
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }

  readOutputFile(fileName: string) {
    const filePath = path.join(process.cwd(), 'output', fileName);

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }

  writeOutputFile(fileName: string, data: any) {
    const outputDir = path.join(process.cwd(), 'output');

    // Ensure output folder exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filePath = path.join(outputDir, fileName);

    fs.writeFileSync(
      filePath,
      JSON.stringify(data, null, 2),
    );
  }
}
