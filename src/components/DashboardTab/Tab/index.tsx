import { UseBooleanTypes } from '@/hooks';
import { Container } from "./styles";

type TabProps = {
	children?: React.ReactNode;
	title: string;
	hasButtonToBack?: UseBooleanTypes;
	render?: boolean;
};

export function Tab(props: TabProps) {
	return <Container className="tab_item">{props.children}</Container>;
}
