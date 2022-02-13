import { useAuth, UseBooleanTypes } from '@/hooks'
import { AiOutlineClose } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi';

import {
  Container,
  Content,
  TabChange,
  TabTitle,
} from './styles';

export type TabMenuProps = {
	children: React.ReactElement[] | React.ReactElement;
  menu: UseBooleanTypes;
  changeSelected: (index: number) => void;
  selectedTab: number;
}

export function Menu({
  menu,
  children,
  changeSelected,
  selectedTab
}: TabMenuProps) {
  const { signOut } = useAuth();

  return (
    <Container
      isClosed={menu.state}
    >
      <button 
        onClick={menu.changeToFalse}
        className="close_menu" 
        title="Fechar menu"
      >
        <AiOutlineClose />
      </button>
      <Content>
        {Array.isArray(children) && children.map((item, index) => (
          <TabChange 
            key={index} 
            selected={index === selectedTab}
          >
            <TabTitle 
              onClick={() => changeSelected(index)}
              selected={index === selectedTab}
              className="tab_title"
            >
              {item.props.title}
            </TabTitle>
          </TabChange>
        ))}
        <button 
          className="signout"
          onClick={signOut}
        >
          <span><FiLogOut /> Signout</span>
        </button>
      </Content>
    </Container>
  )
}