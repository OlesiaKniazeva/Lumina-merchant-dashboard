import {
  Card,
  CardMedia,
  Typography,
  Box,
  useTheme,
  styled,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_PLACEHOLDER } from '@/constants/common';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 350,
  minWidth: 200,
  width: '100%',
  backgroundColor: 'white',
  borderRadius: 0,
  boxShadow: 'none',
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: 'none',
    minWidth: 'none',
  },
}));

const StyledCardMedia = styled(CardMedia)({
  width: '100%',
  aspectRatio: '1 / 1',
  objectFit: 'cover',
  borderRadius: 0,
});

const ContentBox = styled(Box)({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  position: 'relative',
});

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 500,
  color: theme.palette.custom.warmTones.header,
  fontFamily: theme.typography.h6.fontFamily,
  marginBottom: 8,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const Price = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.25rem',
  color: theme.palette.custom.price,
  fontFamily: theme.typography.h6.fontFamily,
}));

const StatsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  position: 'absolute',
  bottom: 16,
  right: 16,
});

const StatItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const StatText = styled(Typography)(({ theme }) => ({
  marginLeft: 4,
  fontSize: '0.875rem',
  color: theme.palette.custom.warmTones.body,
  fontWeight: 500,
  fontFamily: theme.typography.fontFamily,
}));

interface AdvertisementCardProps {
  id: string;
  name: string;
  price: number;
  views: number;
  likes: number;
  imageUrl: string | undefined;
}

function AdvertisementCard({
  id,
  name,
  price,
  views,
  likes,
  imageUrl = '',
}: AdvertisementCardProps) {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    navigate(`/advertisements/${id}`);
  };

  return (
    <StyledCard onClick={handleClick}>
      <StyledCardMedia image={imageUrl || DEFAULT_PLACEHOLDER} title={name} />
      <ContentBox>
        <Title variant="h6">{name}</Title>
        <Price>${price}</Price>

        <StatsContainer>
          <StatItem>
            <VisibilityOutlinedIcon
              sx={{
                fontSize: 18,
                color: theme.palette.custom.warmTones.body,
              }}
            />
            <StatText>{views}</StatText>
          </StatItem>

          <StatItem>
            <FavoriteIcon
              sx={{
                fontSize: 18,
                color: theme.palette.custom.heart,
              }}
            />
            <StatText>{likes}</StatText>
          </StatItem>
        </StatsContainer>
      </ContentBox>
    </StyledCard>
  );
}

export default AdvertisementCard;
