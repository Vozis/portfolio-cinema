import { Injectable } from '@nestjs/common';
import { IFileResponse } from './file.interface';
import { v4 as uuidv4 } from 'uuid';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { File } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { returnFileObject, returnFullFileObject } from './return-file.object';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.file.findMany({
      select: returnFileObject,
    });
  }

  async getFile(id: number) {
    return this.prisma.file.findUnique({
      where: { id },
    });
  }

  async saveFiles(files: Express.Multer.File[], folder: string = 'default') {
    const uploadedFolder = `${path}/uploads/${folder}`;

    // console.log('uploadedFolder: ', uploadedFolder);

    // console.log('files from api fileService: ', files);
    await ensureDir(uploadedFolder);

    const response = await Promise.all(
      files.map(async file => {
        const originalName = file.originalname.split('.');
        const uploadedName = `${uuidv4()}.${originalName[1]}`;

        await writeFile(`${uploadedFolder}/${uploadedName}`, file.buffer);

        return {
          url: `/uploads/${folder}/${uploadedName}`,
          name: `${uploadedName}`,
          originalName: `${file.originalname}`,
          folder: folder,
        };
      }),
    );

    return await Promise.all(
      response.map(async data => {
        // console.log('data: ', data);

        return this.prisma.file.create({
          data: {
            ...data,
          },
          select: returnFullFileObject,
        });
      }),
    );
  }

  async getByFolder(folder: string) {
    return this.prisma.file.findMany({
      where: {
        folder: folder,
      },
      select: returnFileObject,
    });
  }
}
