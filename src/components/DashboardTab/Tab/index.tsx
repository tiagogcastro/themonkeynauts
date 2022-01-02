import { Container } from "./styles";

type TabProps = {
	children?: React.ReactNode;
	title: string;
};

export function Tab(props: TabProps) {
	return <Container>{props.children}</Container>;
}
