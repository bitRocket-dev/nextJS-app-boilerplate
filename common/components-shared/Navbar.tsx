/** @format */

import styled from '@emotion/styled';
import Link from 'next/link';
import { i18n } from 'next-i18next';

import { selectorAuth } from '../../redux/auth/selectors';
import { useAppSelector } from '../../redux/hooks';

// #region ::: STYLED
const StyledNav = styled.nav({
  backgroundColor: 'black',
  color: 'white',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
});

const StyledUl = styled.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
});

const StyledLi = styled.li({
  margin: '0 10px',
});

const StyledLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
});
// #endregion

export const Navbar = () => {
  const { isAuthenticated } = useAppSelector(selectorAuth);

  if (!isAuthenticated) return null;
  return (
    <StyledNav>
      <StyledUl>
        <StyledLi>
          <StyledLink href="/">{i18n?.t('home')}</StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLink href="/about">{i18n?.t('about')}</StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLink style={{ marginRight: '20px' }} href={`/${i18n?.t('developers')}`} locale={i18n?.language}>
            {i18n?.t('developers')}
          </StyledLink>
        </StyledLi>
      </StyledUl>
    </StyledNav>
  );
};
