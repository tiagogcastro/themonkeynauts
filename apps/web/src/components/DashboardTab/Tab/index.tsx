import { UseBooleanTypes } from '@/hooks';
import { Container } from "./styles";

type TabProps = {
	children?: React.ReactNode;
	title: string;
	icon?: React.ReactNode;
	hasButtonToBack?: UseBooleanTypes;
	render?: boolean;
};

export function Tab(props: TabProps) {
	return <Container className="tab_item">{props.children}</Container>;
}
