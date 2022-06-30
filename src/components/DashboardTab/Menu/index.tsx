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
	children:  React.ReactNode;
  menu: UseBooleanTypes;
  changeSelected: (index: number) => void;
  selectedTab: number;
  menuContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  menuContentProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function Menu({
  menu,
  children,
  changeSelected,
  selectedTab,
  menuContentProps,
  menuContainerProps
}: TabMenuProps) {
  const { signOut } = useAuth();
  return (
    <Container
      className='tabmenuclasse'
      {...menuContainerProps}
      isClosed={menu.state}
    >
      <button 
        onClick={menu.changeToFalse}
        className="close_menu" 
        title="Fechar menu"
      >
        <AiOutlineClose />
      </button>
      <Content 
        {...menuContentProps}
      >
        {Array.isArray(children) ? children.map(({props: {render = true, title}}, index) => (
          render && (
            <TabChange 
              key={index} 
              selected={index === selectedTab}
              className="tab_title_btn"
            >
              <TabTitle 
                onClick={() => changeSelected(index)}
                selected={index === selectedTab}
                className="tab_title"
              >
                {title}
              </TabTitle>
            </TabChange>
          )
        )) : (
          <TabChange 
            selected={true}
            className="tab_title_btn"
          >
            <TabTitle 
              selected={true}
              className="tab_title"
            >
              {children && (children as any)?.props?.title}
            </TabTitle>
          </TabChange>
        )}
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