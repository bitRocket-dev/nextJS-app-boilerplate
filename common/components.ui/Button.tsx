/** @format */

import { memo } from 'react';

import styled from '@emotion/styled';

// #region ::: STYLED

const StyledButton = styled.button(({ disabled }: { disabled: boolean }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 'none',
  height: '50px',
  background: disabled ? 'grey' : '#61DAFB',
  border: 'none',
  boxShadow: disabled ? 'none' : `1px 2px 0px #7de0fb`,
  cursor: disabled ? 'not-allowed' : 'pointer',
  color: disabled ? 'grey' : 'black',
  fontWeight: 900,
  textTransform: 'uppercase',
  letterSpacing: '-1px',
  borderWidth: '1px',
  fontSize: '1rem',
  borderRadius: '40px',
  padding: '10px',
  '&:active': {
    outline: 'none',
  },
  '&:focus': {
    outline: 'none',
  },
  '&:hover': {
    opacity: disabled ? 1 : 0.5,
    background: disabled ? 'grey' : ' #7de0fb',
  },
}));

// #endregion

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  label?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const UIButton = memo(({ disabled = false, onClick, label, onMouseEnter, onMouseLeave }: Props) => (
  <StyledButton disabled={disabled} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    {label}
  </StyledButton>
));
