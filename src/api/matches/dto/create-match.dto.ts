import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { IsExists } from 'src/validations/exists.constraint';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsInt()
  weekNumber: number;

  @IsNotEmpty()
  @IsInt()
  @IsExists({ tableName: 'teams', column: 'id' })
  homeTeamId: number;

  @IsNotEmpty()
  @IsInt()
  @IsExists({ tableName: 'teams', column: 'id' })
  awayTeamId: number;

  @IsNotEmpty()
  @IsDate()
  matchDate: Date;
}
