import styled from 'styled-components';

export default styled.input`
    width: ${({type, w}) => type === 'checkbox' ? '' : w ? w : '400px'};
    height: 35px;
    margin: ${({margin}) => margin || '10px'};
    padding: 5px;
    border-radius: 5px;
    font-size: 15px;
    background-color: ${({bgColor}) => bgColor || ''};
    opacity: ${({opacity}) => opacity || ''};
    position: ${({position}) => position || ''};
`