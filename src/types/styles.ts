export interface GlobalLayoutProps {
  isDark: boolean;
}

export interface MainMenuProps {
  activeIndex: number;
}

export interface CustomInputProps {
  isForm?: boolean;
  length?: string;
  value?: string;
  open?: boolean;
}

export interface RoleButtonProps {
  checked: boolean;
  imgHeight: number;
}

export interface ModalStyleProps {
  modalSize?: string;
}

export interface CommonBtnProps {
  btnType?: string;
  textColor?: string;
}

export interface TableStyleProps {
  template?: string;
  isCurrent?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export interface UserStyleProps {
  right?: boolean;
  col?: 1 | 2;
  negative?: boolean;
  find?: boolean;
}
