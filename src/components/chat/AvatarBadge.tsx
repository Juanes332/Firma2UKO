import { Avatar, AvatarProps, Badge, styled } from "@mui/material";
import { FC } from "react";

// component props interface
interface AvatarBadgeProps {
  image: string;
  badgeSize?: number;
  badgeColor?:
    | "default"
    | "success"
    | "info"
    | "error"
    | "warning"
    | "primary"
    | "secondary";
}

const StyledBadge = styled(Badge)<{ badgesize?: number }>(
  ({ theme, badgesize }) => ({
    "& .MuiBadge-badge": {
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      height: badgesize || 10,
      minWidth: badgesize || 10,
      borderRadius: "50%",
    },
  })
);

const AvatarBadge: FC<AvatarBadgeProps & AvatarProps> = ({
  badgeColor,
  badgeSize,
  image,
  ...props
}) => {
  return (
    <StyledBadge
      variant="dot"
      color={badgeColor || "success"}
      overlap="circular"
      badgesize={badgeSize}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Avatar src={image} {...props} />
    </StyledBadge>
  );
};

export default AvatarBadge;
