import sys

def move_sig(filepath, sig_start, sig_end, insert_before):
    with open(filepath, "r") as f:
        lines = f.readlines()
        
    start_idx = -1
    for i, line in enumerate(lines):
        if sig_start in line:
            start_idx = i
            break
            
    if start_idx == -1:
        print(f"Sig start not found in {filepath}")
        return
        
    end_idx = -1
    for i in range(start_idx, len(lines)):
        if sig_end in line and "</motion.svg>" in lines[i-1]:
            # This is a bit fragile, let's just count open/close divs
            pass
            
    # Actually, we know it's <div className="fixed... -> <motion.svg> -> ... -> </motion.svg> -> </div>
    # Let's just find the `</div>` that comes immediately after `</motion.svg>`
    for i in range(start_idx, len(lines)):
        if "</motion.svg>" in lines[i]:
            # The next line should be </div>
            for j in range(i, len(lines)):
                if "</div>" in lines[j]:
                    end_idx = j
                    break
            break
            
    if end_idx == -1:
        print(f"Sig end not found in {filepath}")
        return
        
    sig_block = lines[start_idx:end_idx+1]
    
    # Check if we are already at the end of the file. If we are within the last 10 lines, don't move it again.
    if start_idx > len(lines) - 20:
        print(f"Sig is already at the bottom in {filepath}")
        # But we still need to fix the class name
        pass
    else:
        del lines[start_idx:end_idx+1]
        
        insert_idx = -1
        # Find the last occurrence of the insert_before string
        for i in range(len(lines)-1, -1, -1):
            if insert_before in lines[i]:
                insert_idx = i
                break
                
        if insert_idx != -1:
            lines = lines[:insert_idx] + sig_block + lines[insert_idx:]
        else:
            print(f"Insert marker not found in {filepath}")
            return
            
    # Now fix the class string
    for i, line in enumerate(lines):
        if "className=\"fixed top-8 right-8" in line and "pointer-events-none" in line:
            # We want exact: className="fixed top-8 right-8 pointer-events-none z-[100] scale-[0.7] opacity-60"
            # But the user might have other classes.
            # Let's just replace the whole line if it matches
            lines[i] = '          className="fixed top-8 right-8 pointer-events-none z-[100] scale-[0.7] opacity-60"\n'
            
    with open(filepath, "w") as f:
        f.writelines(lines)
    print(f"Fixed {filepath}")

move_sig(
    "/Users/muarijshakeel/Downloads/Portfolio/components/Hero.tsx",
    "{/* Signature Logo Watermark */}",
    "</div>",
    "</section>"
)

move_sig(
    "/Users/muarijshakeel/Downloads/Portfolio/components/CinematicSequence.tsx",
    "{/* SIGNATURE LOGO WATERMARK */}",
    "</div>",
    "  );"
)
