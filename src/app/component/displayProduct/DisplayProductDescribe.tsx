import React, { useEffect, useRef, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useDisplayProductContext } from '../../../context/DisplayProductContext';

const DisplayProductDescribe = () => {
    const { productDescribe, setProductDescribe, describeImageFiles, setDescribeImageFiles } = useDisplayProductContext();
    const quillRef = useRef<ReactQuill | null>(null);

    useEffect(() => {
        const loadHighlightJs = async () => {
            const hljs = (await import('highlight.js')).default;
            hljs.configure({ languages: ['javascript', 'python', 'html'] });
        };
        loadHighlightJs();
    }, []);

    const handleImageUpload = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64Image = reader.result;
                    const quill = quillRef.current?.getEditor();
                    const range = quill?.getSelection();
                    if (quill && range) {
                        quill.insertEmbed(range.index, 'image', base64Image);
                        quill.setSelection({ index: range.index + 1, length: 0 });

                        
                        setDescribeImageFiles([...describeImageFiles, file]);
                    }
                };
                reader.readAsDataURL(file);
            }
        };
    }, [describeImageFiles, setDescribeImageFiles]);

    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            quill.getModule('toolbar').addHandler('image', handleImageUpload);
        }
    }, [handleImageUpload]);

    const handleContentChange = (value: string) => {
        setProductDescribe(value);
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'], 
            ['clean'],
        ],
    };

    return (
        <div style={{ height: '550px', display: 'block' }}>
            <Container className='mt-4' style={{ height: '550px' }}>
                <Row>
                    <Col sm={2}> <strong>详情描述</strong></Col>
                    <Col sm={10}>
                        <ReactQuill
                            ref={quillRef}
                            style={{ height: '450px', minWidth: "200px", margin: '20px 20px' }}
                            value={productDescribe}
                            modules={modules}
                            placeholder='此处可输入商品详情描述的图文信息'
                            onChange={handleContentChange}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DisplayProductDescribe;