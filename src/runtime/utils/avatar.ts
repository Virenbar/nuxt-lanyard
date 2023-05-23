import { DiscordUser } from "../types";

const CDN_AVATAR = "https://cdn.discordapp.com/avatars";
const CDN_AVATAR_DEFAULT = "https://cdn.discordapp.com/embed/avatars";

export function resolveAvatar(user?: DiscordUser) {
  if (!user) { return; }

  // Fallback avatar
  if (!user.avatar) {
    return `${CDN_AVATAR_DEFAULT}${parseInt(user.discriminator) % 5}.png`;
  }
  // Animated prefix
  if (user.avatar.startsWith("a_")) {
    return `${CDN_AVATAR}/${user.id}/${user.avatar}.gif?size=512`;
  }
  return `${CDN_AVATAR}/${user.id}/${user.avatar}.webp?size=512`;
}
