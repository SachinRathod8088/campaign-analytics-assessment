import { Module, Global } from '@nestjs/common';
import { FileReaderService } from './file-reader.service';

@Global()
@Module({
  providers: [FileReaderService],
  exports: [FileReaderService],
})
export class CommonModule {}
