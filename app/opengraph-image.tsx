import { ImageResponse } from 'next/og';

export const alt='MaanavaN Bytes — Understand technology one visual Byte at a time';
export const size={width:1200,height:630};
export const contentType='image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',position:'relative',overflow:'hidden',background:'linear-gradient(135deg,#041a27 0%,#08384b 62%,#0a6571 100%)',color:'white',padding:'72px',fontFamily:'sans-serif'}}>
    <div style={{position:'absolute',inset:0,display:'flex',opacity:.12,backgroundImage:'linear-gradient(rgba(255,255,255,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.25) 1px,transparent 1px)',backgroundSize:'48px 48px'}}/>
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',zIndex:1}}>
      <div style={{display:'flex',alignItems:'center',gap:'18px',fontSize:28,fontWeight:800}}><span style={{display:'flex',width:58,height:58,alignItems:'center',justifyContent:'center',borderRadius:14,background:'#65dbe3',color:'#062635'}}>M</span>MaanavaN® <span style={{fontSize:18,letterSpacing:5,color:'#78dce3'}}>BYTES</span></div>
      <div style={{display:'flex',flexDirection:'column'}}><div style={{display:'flex',flexDirection:'column',fontSize:65,fontWeight:780,lineHeight:1.04,letterSpacing:'-3px',maxWidth:900}}><span>Understand technology.</span><span>One visual Byte at a time.</span></div><div style={{marginTop:28,fontSize:24,color:'#b7d3da'}}>Mental models · Visual workflows · Real scenarios · Practical decisions</div></div>
      <div style={{display:'flex',fontSize:18,color:'#71dce3'}}>bytes.maanavan.com</div>
    </div>
  </div>,size);
}
