import styled from 'styled-components';

export default styled.p`
    font-size: ${({fontS}) => fontS || '18px'};
    font-weight: ${({fontW}) => fontW || ''};
    font-style: ${({fontStyle}) => fontStyle || ''};
    text-align: ${({textAlign}) => textAlign || 'center'};
    width: ${({w}) => w || ''};
    height: ${({h}) => h || ''};
    background-color: ${({bgColor}) => bgColor || ''};
    color: ${({fontColor}) => fontColor || ''};
    margin: ${({margin}) => margin || '0'};
    padding: ${({padding}) => padding || ''};
    white-space: ${({whiteSpace}) => whiteSpace || ''};
    line-height: ${({lineHeight}) => lineHeight || ''};
    max-width: ${({maxWidth}) => maxWidth || ''};
    `