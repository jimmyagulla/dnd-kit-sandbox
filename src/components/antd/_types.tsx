import {
  BadgeProps,
  ButtonProps,
  CalendarProps,
  CardProps,
  CheckboxProps,
  CollapsePanelProps,
  CollapseProps,
  DrawerProps,
  EmptyProps,
  ImageProps,
  InputProps,
  ListProps,
  ModalProps,
  PopoverProps,
  RadioChangeEvent,
  RadioProps,
  RowProps,
  SelectProps,
  StepProps,
  StepsProps,
  TablePaginationConfig,
  TableProps,
  TagProps,
  TimelineProps,
  TooltipProps,
  TreeProps,
} from 'antd';
import {
  PickerProps,
  PickerTimeProps,
  RangePickerTimeProps,
} from 'antd/es/date-picker/generatePicker';
import { TransferDirection } from 'antd/es/transfer';
import { CheckboxGroupProps, CheckboxValueType } from 'antd/lib/checkbox/Group';
import { RangePickerProps as BaseRangePickerProps } from 'antd/lib/date-picker/generatePicker';
import { DividerProps } from 'antd/lib/divider';
import { TextAreaProps } from 'antd/lib/input/TextArea';
import { ListItemMetaProps, ListItemProps } from 'antd/lib/list';
import { ArgsProps } from 'antd/lib/notification/interface';
import { BaseOptionType, SelectValue } from 'antd/lib/select';
import { SwitchProps } from 'antd/lib/switch';
import { ColumnProps } from 'antd/lib/table';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { DataNode } from 'antd/lib/tree';
import { LinkProps } from 'antd/lib/typography/Link';
import { TextProps } from 'antd/lib/typography/Text';
import { TitleProps } from 'antd/lib/typography/Title';
import { RcFile, UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { Moment } from 'moment/moment';
import { GroupConsumerProps } from 'rc-image/lib/PreviewGroup';
import { MenuInfo } from 'rc-menu/lib/interface';
import { RangeValue } from 'rc-picker/lib/interface';
import { DefaultOptionType } from 'rc-select/lib/Select';
import { ExpandableConfig } from 'rc-table/lib/interface';

export type AntdBadgeProps = BadgeProps;
export type AntdButtonProps = ButtonProps;
export type AntdCardProps = CardProps;
export type AntdCheckboxProps = CheckboxProps;
export type AntdCheckboxGroupProps = CheckboxGroupProps;
export type AntdCheckboxValueType = CheckboxValueType;
export type AntdCollapseProps = CollapseProps;
export type AntdCollapsePanelProps = CollapsePanelProps;
export type AntdColumnProps<T> = ColumnProps<T>;
export type AntdDataNode = DataNode;
export type AntdDatePickerProps = PickerProps<Moment>;
export type AntdDividerProps = DividerProps;
export type AntdDrawerProps = DrawerProps;
export type AntdEmptyProps = EmptyProps;
export type AntdExpandableConfig<T> = ExpandableConfig<T>;
export type AntdFile = RcFile;
export type AntdFilterValue = FilterValue;
export type AntdGroupConsumerProps = GroupConsumerProps;
export type AntdInputProps = InputProps;
export type AntdRadioProps = RadioProps;
export type AntdLinkProps = LinkProps;
export type AntdListItemProps = ListItemProps;
export type AntdListItemMetaProps = ListItemMetaProps;
export type AntdListProps<T> = ListProps<T>;
export type AntdMenuInfo = MenuInfo;
export type AntdModalProps = ModalProps;
export type AntdNotificationProps = ArgsProps;
export type AntdPopoverProps = PopoverProps;
export type AntdRadioChangeEvent = RadioChangeEvent;
export type AntdRangePickerProps = BaseRangePickerProps<Moment>;
export type AntdRangeValue<T> = RangeValue<T>;
export type AntdRowProps = RowProps;
export type AntdTagProps = TagProps;
export type AntdSelectBaseOption = BaseOptionType;
export type AntdSelectDefaultOption = DefaultOptionType;
export type AntdSelectProps<
  ValueType,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> = SelectProps<ValueType, OptionType>;
export type AntdSelectValue = SelectValue;
export type AntdSorterResult<T> = SorterResult<T>;
export type AntdSwitchProps = SwitchProps;
export type AntdTableProps<T> = TableProps<T>;
export type AntdTablePaginationConfig = TablePaginationConfig;
export type AntdTextAreaProps = TextAreaProps;
export type AntdTextProps = TextProps;
export type AntdTimelineProps = TimelineProps;
export type AntdImageProps = ImageProps;
export type AntdTimePickerProps = Omit<PickerTimeProps<Moment>, 'picker'>;
export type AntdTimeRangePickerProps = Omit<
  RangePickerTimeProps<Moment>,
  'picker'
>;
export type AntdTitleProps = TitleProps;
export type AntdTooltipProps = TooltipProps;
export type AntdTreeProps = TreeProps;
export type AntdUploadFile<T> = UploadFile<T>;
export type AntdUploadProps<T> = UploadProps<T>;
export type AntdCalendarProps<T> = CalendarProps<T>;
export type AntdStepsProps = StepsProps;
export type AntdStepProps = StepProps;
export type AntTransferDirection = TransferDirection;
