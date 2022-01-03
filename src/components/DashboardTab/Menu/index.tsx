import { UseBooleanTypes } from '@/hooks'
import { AiOutlineClose } from 'react-icons/ai'

import {
  Container,
  Content,
  TabChange
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
            selected={index === selectedTab}
          >
            <button 
              onClick={() => changeSelected(index)}
              className="tab_title"
              >
              {item.props.title}
            </button>
          </TabChange>
        ))}
      </Content>
    </Container>
  )
}