import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async getFiles() {
    return await this.fileService.getAll();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async saveFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder: string,
  ) {
    return this.fileService.saveFiles(files, folder);
  }

  @Get('by-folder/:folder')
  @Auth('admin')
  async getByFolder(@Param('folder') folder: string) {
    return this.fileService.getByFolder(folder);
  }
}
