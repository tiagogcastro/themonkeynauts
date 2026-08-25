import { 
  Container,
  Content,
  Equipaments,
  Equipament,
} from './styles';

import notFound from '@/assets/notfound.png';

export function EquipamentsTab() {
  
  return (
    <Container>
      <Content>
        <Equipaments>
          <Equipament>
            <img src={notFound} />
          </Equipament>
          <Equipament>
            {/* <img src={notFound} /> */}
          </Equipament>
        </Equipaments>
      </Content>
    </Container>
  );
}