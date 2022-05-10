import { PartialType } from '@nestjs/swagger';
import { CreateLoginGithubDto } from './create-login-github.dto';

export class UpdateLoginGithubDto extends PartialType(CreateLoginGithubDto) {}
