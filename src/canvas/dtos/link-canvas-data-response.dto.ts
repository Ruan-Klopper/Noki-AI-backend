import { ApiProperty } from "@nestjs/swagger";

export class LinkCanvasDataResponseDto {
  @ApiProperty({
    description: "Success message with summary of linked data",
    example:
      "Your canvas account has been linked successfully, 5 courses and 23 assignments loaded to your Noki account.",
  })
  message: string;
}
