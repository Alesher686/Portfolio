import {Dispatch, SetStateAction} from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {Cross1Icon, HamburgerMenuIcon} from "@radix-ui/react-icons";

import s from './dropDown.module.scss'

interface IProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DropDown = ({ isOpen, setOpen }:IProps) => {
    return (
        <DropdownMenu.Root open={isOpen} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
                <button className={s.IconButton} aria-label="Toggle menu">
                    {isOpen ? (
                        <Cross1Icon width="30" height="30" style={{ color: 'white' }} />
                    ) : (
                        <HamburgerMenuIcon width="30" height="30" style={{ color: 'white' }} />
                    )}
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className={s.Content} sideOffset={5}>
                    <DropdownMenu.Item className={s.Item}>
                        New Tab
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className={s.Item}>
                        New Tab
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};