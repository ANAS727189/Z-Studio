import { FuzzyText } from '../components/page';

const hoverIntensity = 1.06;
const enableHover = true;

const NotFound = () => {
     console.log('NotFound component rendering');
  return (
     <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#060111'
    }}>
            <FuzzyText 
                baseIntensity={0.2} 
                hoverIntensity={hoverIntensity} 
                enableHover={enableHover}
                fontSize="clamp(2rem, 12vw, 5rem)"
            >
            404 Not Found
            </FuzzyText>
    </div>
  )
}

export default NotFound