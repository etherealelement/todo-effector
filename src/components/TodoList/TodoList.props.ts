import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface TodoListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    label: string;
    model?: any;
}