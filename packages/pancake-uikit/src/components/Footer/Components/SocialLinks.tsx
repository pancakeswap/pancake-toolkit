import React from "react";
import { darkColors } from "../../..";
import * as IconModule from "../../Svg";
import { FlexProps } from "../../Box";
import Flex from "../../Box/Flex";
import Dropdown from "../../Dropdown/Dropdown";
import Link from "../../Link/Link";
import { SvgProps } from "../../Svg";
import { socials } from "../config";

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

const SocialLinks: React.FC<FlexProps> = ({ ...props }) => (
  <Flex {...props}>
    {socials.map((social, index) => {
      const Icon = Icons[social.icon];
      const iconProps = { width: "24px", height: "24px", color: darkColors.textSubtle, style: { cursor: "pointer" } };
      const mr = index < socials.length - 1 ? "24px" : 0;
      if (social.items) {
        return (
          <Dropdown key={social.label} position="top" target={<Icon {...iconProps} mr={mr} />}>
            {social.items.map((item) => (
              <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
                {item.label}
              </Link>
            ))}
          </Dropdown>
        );
      }
      return (
        <Link external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
          <Icon {...iconProps} />
        </Link>
      );
    })}
  </Flex>
);

export default React.memo(SocialLinks, () => true);
