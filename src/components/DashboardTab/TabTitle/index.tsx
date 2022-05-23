import { BsArrowLeft } from 'react-icons/bs';

import { UseBooleanTypes } from '@/hooks';

import {
	Container,
	Content,
} from './styles';

import menu_icon from '@/assets/svg/menu_icon.svg';

export type TabTitleProps = {
	selectedTab: number;
	children: React.ReactNode;
	menu: UseBooleanTypes;
	hasButtonToBack: UseBooleanTypes;
};

export function TabTitle({
	selectedTab,
	children,
	menu,
	hasButtonToBack
}: TabTitleProps) {
	return (
		<Container 
			isShow={menu.state}
			className="tab_list"
		>
			{Array.isArray(children) && children[selectedTab] && (
				<Content>
					{hasButtonToBack && hasButtonToBack.state && (
						<button
							className="back_page" 
							onClick={hasButtonToBack.changeToFalse}
						>
							<BsArrowLeft />
						</button>
					)}
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