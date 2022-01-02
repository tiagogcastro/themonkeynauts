import { UseBooleanTypes } from '@/hooks';

import {
  Container,
	Content,
} from './styles';

import menu_icon from '@/assets/svg/menu_icon.svg';

export type TabTitleProps = {
	title?: string;
	index?: number;

	setSelectedTab: (index: number) => void;
	selectedTab: number;
	itemSelected?: React.ReactElement | null;
	children: React.ReactElement[] | React.ReactElement;
	menu: UseBooleanTypes;
};

export function TabTitle({
	title,
	setSelectedTab,
	selectedTab,
	itemSelected,
	children,
	menu
}: TabTitleProps) {

	function handleChangeSelected(index: number) {
		setSelectedTab(index);
	}

	return (
		<Container 
			// selectedTab={selectedTab} 
			// index={index}
			className="tab_list"
		>
			{Array.isArray(children) && children[selectedTab] && (
				<Content>
					<h1 className="tab_title">{children[selectedTab].props.title}</h1>
					<button 
						onClick={menu.changeToTrue}
						className="open_menu" 
						title="Abrir menu"
					>
						<img src={menu_icon} alt="Icone de menu" />	
					</button>
				</Content>
			)}
		</Container>
	);
}