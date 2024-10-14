import React from 'react';
import style from './richTextComponentStyle.module.scss';

interface RichTextProps {
    description: string;
}


const RichTextComponent = React.memo(({ description }: RichTextProps) => {

    return (
        <div className={style.richText} dangerouslySetInnerHTML={{ __html: description }} />
    );
});

RichTextComponent.displayName = 'RichTextComponent';

export default RichTextComponent;