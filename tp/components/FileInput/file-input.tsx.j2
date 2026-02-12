import classNames from "classnames";
import { type ComponentProps, type FC, useRef, useState } from "react";

import { useJss, useTheme } from "@/components/CopyUiProvider";
import { extractStylesProps, IbsBase } from "@/components/IbsBase";

import styles from "./file-input.module.css";

export type FileInputProps = ComponentProps<typeof IbsBase> &
  Omit<ComponentProps<"input">, "size"> & {
    variant?: "default" | "filled";
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;

    onChange?: (files: FileList | null) => void;
    placeholder?: string;
  };

export const FileInput: FC<FileInputProps> = (props) => {
  const {
    variant = "default",
    size = "md",
    leftSection,
    rightSection,
    className,
    style,
    disabled,
    onChange,
    placeholder = "Choose file...",
    accept,
    multiple,

    ...others
  } = props;

  const { stx: baseStyleStx, rest } = extractStylesProps(others);

  const theme = useTheme();
  const jss = useJss();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const baseStx = jss.hash({
    "--fileInput-focus-bdColor": theme.colors.blue["800"],
    "--fileInput-paddingInlineStart": leftSection ? "0.125rem" : "0.75rem",
    "--fileInput-paddingInlineEnd": rightSection ? "0.125rem" : "0.75rem",
    "--fileInput-placeholderColor": theme.colors.gray["600"],
  });

  const inputStx = jss.hash({
    "--fileInput-fontSize": "var(--ibsBase-fontSize)",
    "--fileInput-lineHeight": "var(--ibsBase-lineHeight)",
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
    <IbsBase
      variant={variant}
      size={size}
      disabled={disabled}
      style={style}
      className={classNames(styles.ibsBase, baseStx, baseStyleStx, className)}
    >
      {leftSection && <IbsBase.LeftSection>{leftSection}</IbsBase.LeftSection>}
      <IbsBase.Wrapper>
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
          className={classNames(styles.fileInputWrapper, inputStx)}
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
      </IbsBase.Wrapper>
      {rightSection && (
        <IbsBase.RightSection>{rightSection}</IbsBase.RightSection>
      )}
    </IbsBase>
  );
};

FileInput.displayName = "FileInput";
