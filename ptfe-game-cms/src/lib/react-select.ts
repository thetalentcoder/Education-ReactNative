import type { StylesConfig } from 'react-select';

const reactSelectStylesConfig: StylesConfig = {
  container: (base) => ({ ...base }),
  loadingIndicator: (base) => ({ ...base, marginRight: 20 }),
  control: (base, state) => ({
    ...base,
    border: '2px solid #fff',
    padding: '10px 12px',
    background: '#F5F5F5',
    boxShadow: 'none',
    borderRadius: 12,
    gap: 30,
    ':hover': {
      background: state.isFocused ? '#fff' : '#F5F5F5',
      border: state.isFocused ? '2px solid #87C6E8' : '2px solid #fff'
    }
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none'
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transform: state.selectProps.menuIsOpen ? 'translateY(-50%) rotate(0deg)' : 'translateY(-50%) rotate(180deg)',
    transition: 'all 0.3s ease-in-out',
    position: 'absolute',
    color: '#C3C6D1',
    padding: 0,
    right: 12,
    top: '50%'
  }),
  input: (base) => ({
    ...base,
    lineHeight: '21px',
    fontSize: '14px',
    color: '#565656',
    fontWeight: 400,
    padding: 0,
    margin: 0
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: 14
  }),
  singleValue: (base, state) => ({
    ...base,
    color: state.hasValue ? '#565656' : '#C7C7C7',
    lineHeight: '21px',
    fontSize: '14px',
    fontWeight: 400,
    margin: 0
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    overflow: 'auto',
    background: '#fff',
    zIndex: 5,
    border: 0,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    '::-webkit-scrollbar' : {
      height: 0,
      width: 10,
    },
    '::-webkit-scrollbar-button' : {
      width: 0,
      height: 0,
      background: 'black',
    },
    '::-webkit-scrollbar-track' : {
      background: 'transparent',
    },
    '::-webkit-scrollbar-thumb' : {
      background: '#CCC',
      ':hover' : {
        background: '#888' 
      }
    }
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#565656',
    background: state.isFocused ? '#F5F5F5' : '#fff',
    opacity: state.isDisabled ? 0.5 : 1,
    cursor: state.isDisabled ? 'not-allowed' : 'pointer'
  }),
  clearIndicator: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    marginRight: 20
  })
};

export default reactSelectStylesConfig;
