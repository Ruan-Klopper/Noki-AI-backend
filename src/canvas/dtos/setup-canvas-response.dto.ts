import { ApiProperty } from "@nestjs/swagger";

export class CanvasUserDetails {
  @ApiProperty({
    description: "Canvas user ID",
    example: 3346,
  })
  id: number;

  @ApiProperty({
    description: "Full name of the Canvas user",
    example: "Ruan Klopper",
  })
  name: string;

  @ApiProperty({
    description: "User creation date",
    example: "2023-02-06T12:49:30+02:00",
  })
  created_at: string;

  @ApiProperty({
    description: "Sortable name format",
    example: "Klopper, Ruan",
  })
  sortable_name: string;

  @ApiProperty({
    description: "Short name",
    example: "Ruan Klopper",
  })
  short_name: string;

  @ApiProperty({
    description: "Avatar URL",
    example: "https://uxi.instructure.com/images/messages/avatar-50.png",
  })
  avatar_url: string;

  @ApiProperty({
    description: "Last name",
    example: "Klopper",
  })
  last_name: string;

  @ApiProperty({
    description: "First name",
    example: "Ruan",
  })
  first_name: string;

  @ApiProperty({
    description: "User locale",
    example: null,
  })
  locale: string | null;

  @ApiProperty({
    description: "Effective locale",
    example: "en-GB",
  })
  effective_locale: string;

  @ApiProperty({
    description: "User permissions",
    example: {
      can_update_name: false,
      can_update_avatar: true,
      limit_parent_app_web_access: false,
    },
  })
  permissions: {
    can_update_name: boolean;
    can_update_avatar: boolean;
    limit_parent_app_web_access: boolean;
  };
}

export class SetupCanvasResponseDto {
  @ApiProperty({
    description: "Success message",
    example: "Canvas Linked successfully",
  })
  message: string;

  @ApiProperty({
    description: "Canvas user details",
    type: CanvasUserDetails,
  })
  user_details: CanvasUserDetails;
}
