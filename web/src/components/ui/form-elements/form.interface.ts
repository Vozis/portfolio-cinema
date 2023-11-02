import { EditorProps } from 'draft-js';
import {
  ButtonHTMLAttributes,
  CSSProperties,
  InputHTMLAttributes,
} from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormGetValues,
} from 'react-hook-form';

import { IFile } from '@/shared/types/movie.types';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IFieldProps {
  placeholder: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

type TypedInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;

export interface IField extends TypedInputPropsField {}

type TypedEditorPropsField = EditorProps & IFieldProps;

export interface ITextEditor
  extends Omit<TypedEditorPropsField, 'editorState'> {
  onChange: (...event: any[]) => void;
  value: string;
}

export interface IUploadField {
  folder?: string;
  value?: IFile[];
  onChange: (...event: any[]) => void;
  placeholder: string;
  error?: FieldError;
  style?: CSSProperties;
  isNoImage?: boolean;
}

export interface IFileUploadField extends TypedInputPropsField {
  isNoImage?: boolean;
  isLoading?: boolean;
  style?: CSSProperties;
}
