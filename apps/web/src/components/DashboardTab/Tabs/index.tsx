import { useEffect, useState } from 'react';
import { useBoolean, UseBooleanTypes } from '@/hooks';
import { Menu } from '../Menu';
import { TabTitle } from '../TabTitle';
import {
	Container,
} from './styles';

export type DashboardTabProps = {
	children: React.ReactNode;
	menuContentProps?: React.HTMLAttributes<HTMLDivElement>;
	menuContainerProps?: React.HTMLAttributes<HTMLDivElement>;
	tabContainerProps?: React.HTMLAttributes<HTMLDivElement>;
	selectedTab?: number;
	changeSelected?: (index: number) => void;
	menu?: UseBooleanTypes;
};

export function Tabs({
	children,
	menuContentProps,
	menuContainerProps,
	tabContainerProps,
	selectedTab: controlledTab,
	changeSelected: controlledChange,
	menu: controlledMenu,
}: DashboardTabProps) {
	const [internalTab, setInternalTab] = useState(0);
	const internalMenu = useBoolean(false);

	const selectedTab = controlledTab ?? internalTab;
	const changeSelected = controlledChange ?? ((index: number) => {
		internalMenu.changeToFalse();
		setInternalTab(index);
	});
	const menuActive = controlledMenu ?? internalMenu;

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth > 1024 && menuActive.state) {
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
				changeSelected={changeSelected}
				children={children}
			/>

			{!menuActive.state && Array.isArray(children) ? children[selectedTab] : !menuActive.state && children}
		</Container>
	);
}
