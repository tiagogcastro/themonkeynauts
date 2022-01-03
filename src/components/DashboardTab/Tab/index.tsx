import { UseBooleanTypes } from '@/hooks';
import { Container } from "./styles";

type TabProps = {
	children?: React.ReactNode;
	title: string;
	hasButtonToBack?: UseBooleanTypes;
};

export function Tab(props: TabProps) {
	return <Container>{props.children}</Container>;
}
