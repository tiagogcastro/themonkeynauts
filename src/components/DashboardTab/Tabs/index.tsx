import { useBoolean } from '@/hooks';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { TabTitle } from '../TabTitle';

import {
  Container,
	Menu,
	MenuContent,
	TabChange
} from './styles';

export type DashboardTabProps = {
	children: React.ReactElement[] | React.ReactElement;
};

export function Tabs({ children }: DashboardTabProps) {
	const [selectedTab, setSelectedTab] = useState(0);
	const menuActive = useBoolean(false);

	function handleChangeSelected(index: number) {
		menuActive.changeToFalse();

		setSelectedTab(index)
	}

	useEffect(() => {
		window.addEventListener('resize', () => {
			if(window.innerWidth > 1024 && menuActive.state) {
				menuActive.changeToFalse();
			}
		})
	})

	return (
		<Container
		>
			<TabTitle
				menu={menuActive}
				children={children}
				setSelectedTab={setSelectedTab}
				selectedTab={selectedTab}
			/>
			<Menu
				isClosed={menuActive.state}
			>
				<button 
					onClick={menuActive.changeToFalse}
					className="close_menu" 
					title="Fechar menu"
				>
					<AiOutlineClose />
				</button>
				<MenuContent>
					{Array.isArray(children) && children.map((item, index) => (
						<TabChange
							selected={index === selectedTab}
						>
							<button 
								onClick={() => handleChangeSelected(index)}
								className="tab_title"
								>
								{item.props.title}
							</button>
						</TabChange>
					))}
				</MenuContent>
			</Menu>

			{!menuActive.state && Array.isArray(children) && children[selectedTab]}
		</Container>
	);
}