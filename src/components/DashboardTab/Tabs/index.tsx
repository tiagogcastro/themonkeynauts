import { useBoolean } from '@/hooks';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { TabTitle } from '../TabTitle';

import {
  Container,
	Menu,
	MenuContent
} from './styles';

export type DashboardTabProps = {
	children: React.ReactElement[] | React.ReactElement;
};

export function Tabs({ children }: DashboardTabProps) {
	const [selectedTab, setSelectedTab] = useState(0);
	const menuActive = useBoolean(false);

	return (
		<Container>
			{!menuActive.state ? (
				<>
					<TabTitle
						menu={menuActive}
						children={children}
						setSelectedTab={setSelectedTab}
						selectedTab={selectedTab}
					/>
							
					{Array.isArray(children) && children[selectedTab]}
				</>
			) : (
				<Menu>
					<button 
						onClick={menuActive.changeToFalse}
						className="close_menu" 
						title="Fechar menu"
					>
						<AiOutlineClose />
					</button>
					<MenuContent>
						{Array.isArray(children) && children.map((item, index) => (
							<button 
								onClick={() => setSelectedTab(index)}
								className="tab_title"
							>
								{item.props.title}
							</button>
						))}
					</MenuContent>
				</Menu>
			)}
		</Container>
	);
}