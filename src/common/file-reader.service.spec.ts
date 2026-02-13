import { FileReaderService } from './file-reader.service';
import * as fs from 'fs';
import * as path from 'path';

describe('FileReaderService', () => {
  let service: FileReaderService;

  beforeEach(() => {
    service = new FileReaderService();
  });

  it('should create output file successfully', () => {
    const testData = { hello: 'world' };
    const filename = 'test-output.json';

    // Ensure output directory exists
    const outputDir = path.join(process.cwd(), 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    service.writeOutputFile(filename, testData);

    const outputPath = path.join(outputDir, filename);

    expect(fs.existsSync(outputPath)).toBe(true);

    const content = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    expect(content).toEqual(testData);

    // Cleanup
    fs.unlinkSync(outputPath);
  });
});
