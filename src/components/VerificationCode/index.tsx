import React, { useState, useEffect, useRef } from 'react';
import "./style.less"
import logo from "@/static/images/logo.png";
import {CloseOutlined, CheckOutlined,ArrowRightOutlined } from '@ant-design/icons';


const STATUS_LOADING = 0 // 还没有图片
const STATUS_READY = 1 // 图片渲染完成,可以开始滑动
const STATUS_MATCH = 2 // 图片位置匹配成功
const STATUS_ERROR = 3 // 图片位置匹配失败


const createClipPath = (ctx, size = 100, styleIndex = 0) => {
    const styles = [
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 0, 1, 1],
        [0, 1, 0, 0],
        [0, 1, 0, 1],
        [0, 1, 1, 0],
        [0, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 0, 0, 1],
        [1, 0, 1, 0],
        [1, 0, 1, 1],
        [1, 1, 0, 0],
        [1, 1, 0, 1],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
    ]
    const style = styles[styleIndex]

    const r = 0.1 * size
    ctx.save()
    ctx.beginPath()
    // left
    ctx.moveTo(r, r)
    ctx.lineTo(r, 0.5 * size - r)
    ctx.arc(r, 0.5 * size, r, 1.5 * Math.PI, 0.5 * Math.PI, style[0])
    ctx.lineTo(r, size - r)
    // bottom
    ctx.lineTo(0.5 * size - r, size - r)
    ctx.arc(0.5 * size, size - r, r, Math.PI, 0, style[1])
    ctx.lineTo(size - r, size - r)
    // right
    ctx.lineTo(size - r, 0.5 * size + r)
    ctx.arc(size - r, 0.5 * size, r, 0.5 * Math.PI, 1.5 * Math.PI, style[2])
    ctx.lineTo(size - r, r)
    // top
    ctx.lineTo(0.5 * size + r, r)
    ctx.arc(0.5 * size, r, r, 0, Math.PI, style[3])
    ctx.lineTo(r, r)

    ctx.clip()
    ctx.closePath()
}

const VerificationCode = props => {
    const [isMovable, setIsmovable] = useState(false)
    const [offsetX, setOffsetX] = useState(0)
    const [offsetY, setOffsetY] = useState(0)
    const [startX, setStartX] = useState(0)
    const [oldX, setOldX] = useState(0)
    const [currX, setCurrX] = useState(0)
    const [status, setStatus] = useState(STATUS_LOADING)
    const [showTips, setShowTips] = useState(false)
    const shadowCanvas = useRef(null)
    const fragmentCanvas = useRef(null)
    const [susses, setSusses] = useState(0)




    const { imageUrl, imageWidth, imageHeight, fragmentSize, onload } = props

    useEffect(() => {
        renderImage()
    }, [imageUrl])

    const renderImage = () => {

        
        // 初始化状态
        setStatus(STATUS_LOADING)
        // 创建一个图片对象，主要用于canvas.context.drawImage()
        const objImage = new Image()
        objImage.addEventListener("load", () => {

            const { imageWidth, imageHeight, fragmentSize } = props
            // 先获取两个ctx
            const ctxShadow = shadowCanvas.current.getContext("2d")
            const ctxFragment = fragmentCanvas.current.getContext("2d")

            // 让两个ctx拥有同样的裁剪路径(可滑动小块的轮廓)
            const styleIndex = Math.floor(Math.random() * 16)
            createClipPath(ctxShadow, fragmentSize, styleIndex)
            createClipPath(ctxFragment, fragmentSize, styleIndex)

            // 随机生成裁剪图片的开始坐标
            const clipX = Math.floor(fragmentSize + (imageWidth - 2 * fragmentSize) * Math.random())
            const clipY = Math.floor((imageHeight - fragmentSize) * Math.random())

            // 让小块绘制出被裁剪的部分
            ctxFragment.drawImage(objImage, clipX, clipY, fragmentSize, fragmentSize, 0, 0, fragmentSize, fragmentSize)

            // 让阴影canvas带上阴影效果
            ctxShadow.fillStyle = "rgba(0, 0, 0, 0.5)"
            ctxShadow.fill()

            // 恢复画布状态
            ctxShadow.restore()
            ctxFragment.restore()

            // 设置裁剪小块的位置

            setOffsetX(clipX)
            setOffsetY(clipY)
            // 修改状态          
            setStatus(STATUS_READY)
        })
        objImage.src = props.imageUrl
        objImage.width = props.imageWidth
        objImage.height = props.imageHeight
    }


    const onMoveStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (status !== STATUS_READY) {
            return
        }
        // 记录滑动开始时的绝对坐标x
        setIsmovable(true)
        setStartX(e.clientX)
    }

    const onMoving = (e: { clientX: number; }) => {
        if (status !== STATUS_READY || !isMovable) {
            return
        }
        const distance = e.clientX - startX
        let currX = oldX + distance
        const minX = 0
        const maxX = props.imageWidth - props.fragmentSize
        setCurrX(currX = currX < minX ? 0 : currX > maxX ? maxX : currX)
    }

    const onMoveEnd = () => {
        if (status !== STATUS_READY || !isMovable) {
            return
        }
        setIsmovable(false)
        setOldX(currX)

        const isMatch = Math.abs(currX - offsetX) < 5
        if (isMatch) {
            setStatus(STATUS_MATCH)
            setCurrX(offsetX)
            onShowTips();
            setSusses(1);
            props.onMatch()
        } else {
            setStatus(STATUS_ERROR)
            setSusses(2);
            onReset()
            onShowTips()
            props.onError()
        }
    }

    const onReset = () => {
        const timer = setTimeout(() => {
            setOldX(0)
            setCurrX(0)
            setSusses(0)
            setStatus(STATUS_READY)
            clearTimeout(timer)
        }, 1000)
    }

    const onReload = () => {
        if (status !== STATUS_READY && status !== STATUS_MATCH) {
            return
        }
        const ctxShadow = shadowCanvas.current.getContext("2d")
        const ctxFragment = fragmentCanvas.current.getContext("2d")
        // 清空画布
        ctxShadow.clearRect(0, 0, props.fragmentSize, props.fragmentSize)
        ctxFragment.clearRect(0, 0, props.fragmentSize, props.fragmentSize)
        setIsmovable(false)
        setOffsetX(0)
        setOffsetY(0)
        setStartX(0)
        setOldX(0)
        setCurrX(0)
        setStatus(STATUS_LOADING)
        renderImage()
    }


    useEffect(() => {
        onReset()
        onReload()
    }, [onload])


    const onShowTips = () => {
        if (showTips) {
            return
        }
        setShowTips(true)
        const timer = setTimeout(() => {
            setShowTips(false)
            clearTimeout(timer)
        }, 2000)
    }
    let iocn;
    let back;
    if(susses ==1){
        back = "#D3F4EF";
        iocn = <CheckOutlined  style={{ fontSize: 24, transform: `translate(50%, 30%)`, }} />
    }else if(susses == 2){
        iocn = <CloseOutlined style={{ fontSize: 24, transform: `translate(50%, 30%)`, }}/>
        back = "#FCE1E0"
    }else{
       
        back = 'rgba(25, 145, 250, 0.5)'
        iocn = <ArrowRightOutlined style={{ fontSize: 24, transform: `translate(50%, 30%)`, }}/>
    }

    return (
        <div className="image-code" style={{ width: imageWidth }}>
            <div className="image-container" style={{
                height: imageHeight,
                backgroundImage: `url("${imageUrl}")`
            }}>
                <canvas

                    ref={shadowCanvas}
                    className="canvas"
                    width={fragmentSize}
                    height={fragmentSize}
                    style={{ left: offsetX + "px", top: offsetY + "px" }}
                />
                <canvas
                    ref={fragmentCanvas}
                    className="canvas"
                    width={fragmentSize}
                    height={fragmentSize}
                    style={{ top: offsetY + "px", left: currX + "px" }}
                />
            </div>

            {/* <div className="reload-container">
                <div className="reload-wrapper" onClick={onReload}>
                    <RedoOutlined />
                    <span className="reload-tips">刷新验证</span>
                </div>
            </div> */}
            <div className="slider-wrpper" onMouseMove={(e) => onMoving(e)} onMouseLeave={() => onMoveEnd()}>
                <div className="slider-bar" style={{ background: `linear-gradient(to right,${back} ${currX * 0.3846}%,  #F6F9FA 0%)` }}> {!currX && "按住滑块，拖动完成拼图"}</div>
                <div
                    className={`slider-button-${susses}`}
                    onMouseDown={(e) => onMoveStart(e)}
                    onMouseUp={() => onMoveEnd()}
                    style={{ left: currX + "px", }}
                > 
                    {iocn}    
                </div>
            </div>         
        </div>
    )

}

export default VerificationCode