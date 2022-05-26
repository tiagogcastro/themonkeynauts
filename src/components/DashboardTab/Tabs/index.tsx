import { useBoolean } from '@/hooks';
import { useEffect, useState } from 'react';

import { Menu } from '../Menu';
import { TabTitle } from '../TabTitle';

import {
  Container,
} from './styles';

export type DashboardTabProps = {
	children:  React.ReactNode;
  menuContentProps?: React.HTMLAttributes<HTMLDivElement>;
  menuContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  tabContainerProps?: React.HTMLAttributes<HTMLDivElement>;
};

export function Tabs({ children, menuContentProps, menuContainerProps, tabContainerProps }: DashboardTabProps) {
	const [selectedTab, setSelectedTab] = useState(0);
	const menuActive = useBoolean(false);

	function handleChangeSelected(index: number) {
		menuActive.changeToFalse();

		setSelectedTab(index);
	}

	useEffect(() => {
		window.addEventListener('resize', () => {
			if(window.innerWidth > 1024 && menuActive.state) {
				menuActive.changeToFalse();
			}	
		});
	});

	return (
		<Container
			{...tabContainerProps}
		>
			<TabTitle
				menu={menuActive}
				children={children}
				selectedTab={selectedTab}
				hasButtonToBack={
					Array.isArray(children) && 
					children[selectedTab].props.hasButtonToBack &&
					children[selectedTab].props.hasButtonToBack
				}
			/>
			<Menu
				menuContainerProps={menuContainerProps}
				menuContentProps={menuContentProps}
				selectedTab={selectedTab}
				menu={menuActive}
				children={children}
				changeSelected={handleChangeSelected}
			/>

			{!menuActive.state && Array.isArray(children) && children[selectedTab]}
		</Container>
	);
}