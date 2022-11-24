import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostSchema } from './post.model';

class CreatePostDTO {
  @ApiProperty({ description: '帖子标题', example: '帖子标题' })
  @IsNotEmpty({ message: '帖子标题不能为空' })
  title: string;

  @ApiProperty({ description: '帖子内容', example: '帖子内容' })
  content: string;
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  constructor(@InjectModel(PostSchema) private readonly postModel) {}

  @Get()
  @ApiOperation({ summary: '博客列表' })
  async index() {
    const list = await this.postModel.find();
    return list;
  }

  @Get(':id')
  @ApiOperation({ summary: '帖子详情' })
  async detail(@Param('id') id: string) {
    // const detail = await this.postModel.findById(id).orFail().lean().exec();
    return await this.postModel.findById(id);
  }

  @Post('create')
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() createPostDTO: CreatePostDTO) {
    await this.postModel.create(createPostDTO);
    return {
      success: true,
      ...createPostDTO,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '修改帖子' })
  async update(@Param('id') id: string, @Body() updatePostDTO: CreatePostDTO) {
    await this.postModel.findByIdAndUpdate(id, updatePostDTO);
    return {
      success: true,
      ...(await this.postModel.findById(id).orFail().lean().exec()),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async del(@Param('id') id: string) {
    await this.postModel.findByIdAndDelete(id);
    return {
      success: true,
      id,
    };
  }
}
