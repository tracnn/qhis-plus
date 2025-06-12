declare module 'simplebar-react' {
  import { ComponentType, ReactNode, HTMLAttributes } from 'react';

  export interface SimpleBarProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    scrollableNodeProps?: HTMLAttributes<HTMLDivElement>;
    options?: {
      autoHide?: boolean;
      direction?: 'ltr' | 'rtl';
      clickOnTrack?: boolean;
      scrollbarMinSize?: number;
      scrollbarMaxSize?: number;
      timeout?: number;
    };
  }

  const SimpleBar: ComponentType<SimpleBarProps>;
  export default SimpleBar;
} 