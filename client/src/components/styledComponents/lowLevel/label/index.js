import styled from 'styled-components';

export default styled.label`
    font-size: ${({fontS}) => fontS || '13px'};
    font-weight: bold;
    margin: ${({margin}) => margin || '10px'};
    position: ${({position}) => position || ''};
    width: ${({w}) => w || ''};
    color: ${({fontColor}) => fontColor || '#ffdead'};
`