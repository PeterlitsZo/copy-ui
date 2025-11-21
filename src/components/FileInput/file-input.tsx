import classNames from "classnames";
import { type ComponentProps, type FC, useRef, useState } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { InputBase } from "@/components/InputBase";
import { resolveStyle } from "@/utils/resolve-style";

import styles from "./file-input.module.scss";

export type FileInputProps = Omit<
  ComponentProps<"input">,
  "size" | "type" | "onChange"
> & {
  variant?: "default" | "filled";
  size?: "sm" | "md" | "lg";
  width?: "sm" | "md" | "lg" | "full";

  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;

  onChange?: (files: FileList | null) => void;
  placeholder?: string;
};

export const FileInput: FC<FileInputProps> = (props) => {
  const {
    variant = "default",
    size = "md",
    width,
    leftSection,
    rightSection,
    className,
    style,
    disabled,
    onChange,
    placeholder = "Choose file...",
    accept,
    multiple,
    ...rest
  } = props;

  const theme = useTheme();
  const jss = useJss();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const stx = jss.hash(
    resolveStyle({
      base: {
        "--input-focus-border-color": theme.colors.blue["800"],
        "--input-padding-inline-start": leftSection ? "0.125rem" : "0.75rem",
        "--input-padding-inline-end": rightSection ? "0.125rem" : "0.75rem",
        "--input-placeholder-color": theme.tokens.inputBasePlaceholderColor,
      },
      variants: {
        variant: {
          default: {
            "--input-bg-color": "white",
          },
          filled: {
            "--input-bg-color": theme.colors.gray["000"],
          },
        },
        size: {
          sm: {
            "--input-font-size": theme.tokens.inputBaseSmFontSize,
            "--input-line-height": theme.tokens.inputBaseSmLineHeight,
          },
          md: {
            "--input-font-size": theme.tokens.inputBaseMdFontSize,
            "--input-line-height": theme.tokens.inputBaseMdLineHeight,
          },
          lg: {
            "--input-font-size": theme.tokens.inputBaseLgFontSize,
            "--input-line-height": theme.tokens.inputBaseLgLineHeight,
          },
        },
      },
      cls: {
        size,
        variant,
      },
    }),
  );

  // TODO (PeterlitsZo): I think it is a bad idea... Need some time to rethink it.
  const borderColorStx = jss.hash({
    "--input-base-border-color":
      variant === "filled"
        ? "transparent"
        : theme.tokens.inputBaseDefaultBorderColor,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files);
    onChange?.(files);
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const getDisplayText = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      if (multiple && selectedFiles.length > 1) {
        return `${selectedFiles.length} files selected`;
      }
      return selectedFiles[0].name;
    }
    return placeholder;
  };

  return (
    <InputBase
      size={size}
      width={width}
      leftSection={leftSection}
      rightSection={rightSection}
      disabled={disabled}
      style={style}
      className={classNames(styles.inputBase, stx, borderColorStx, className)}
    >
      <input
        ref={inputRef}
        type="file"
        className={styles.fileInput}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleFileChange}
        {...rest}
      />
      <button
        className={styles.fileInputWrapper}
        onClick={handleClick}
        type="button"
        tabIndex={disabled ? undefined : 0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick();
          }
        }}
      >
        <span
          className={classNames(styles.fileInputText, {
            [styles.placeholder]: !selectedFiles?.length,
          })}
        >
          {getDisplayText()}
        </span>
      </button>
    </InputBase>
  );
};

FileInput.displayName = "FileInput";
