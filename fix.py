import re

with open("components/Hero.tsx", "r") as f:
    text = f.read()
    lines = text.split("\n")

# Find the 5 paths
paths = re.findall(r"d=\"(M[0-9,\. A-Za-z]+z)\"", text)
unique_paths = []
for p in paths:
    if p not in unique_paths:
        unique_paths.append(p)

svg_paths_html = ""
for p in unique_paths:
    svg_paths_html += f"""            <motion.path
              fill="transparent"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              variants={{{{
                hidden: {{ pathLength: 0 }},
                visible: {{ pathLength: 1, transition: {{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }} }}
              }}}}
              d="{p}"
            />\n"""

clean_svg = f"""          <motion.svg 
            viewBox="0 0 1024 544" 
            className="w-[180px] md:w-[220px] lg:w-[260px]" 
            preserveAspectRatio="xMidYMid meet"
            variants={{{{
              hidden: {{}},
              visible: {{ transition: {{ staggerChildren: 0.2, delayChildren: initialRef.current ? 0 : 3.0 }} }}
            }}}}
            initial="hidden"
            animate="visible"
          >\n{svg_paths_html}          </motion.svg>"""

# We want to replace lines[337] to lines[418] inclusive.
# Let's verify by printing them.
print("Deleting from:", lines[337][:40])
print("Deleting to:", lines[418][:40])

new_lines = lines[:337] + [clean_svg] + lines[419:]

with open("components/Hero.tsx", "w") as f:
    f.write("\n".join(new_lines))

print("Fixed components/Hero.tsx")
