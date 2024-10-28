# Copyright 2021-2024 Avaiga Private Limited
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.
# -----------------------------------------------------------------------------------------
# To execute this script, make sure that the taipy-gui package is installed in your
# Python environment and run:
#     python <script>
# -----------------------------------------------------------------------------------------
# Matplotlib scatter chart example
from taipy.gui import Gui
import matplotlib.pyplot as plt
import numpy as np
import mpld3

# Define data
employee_performance = [5, 4.8, 4.5, 4.2, 3.9, 3.7, 4.1, 4.6, 5.0, 4.3]
happiness_scores = [5, 4.5, 4.2, 4.0, 3.8, 3.9, 4.3, 4.7, 4.9, 4.4]

# Calculate sizes based on product of performance and happiness, scaled to 1-100%
sizes = [e * h * 20 for e, h in zip(employee_performance, happiness_scores)]
colors = sizes  # Color based on sizes

# Create the Matplotlib figure
fig, ax = plt.subplots(figsize=(12, 5.2))  # Adjust figsize for a slightly smaller chart
scatter = ax.scatter(employee_performance, happiness_scores, s=sizes, c=colors, cmap="Greens", vmin=min(colors), vmax=max(colors))
ax.set(xlim=(1, 6), xticks=np.arange(1, 7), ylim=(1, 6), yticks=np.arange(1, 7))
ax.set_xlabel('Performance Score')
ax.set_ylabel('Happiness Index')
ax.set_title('Employee Performance vs. Happiness')

# Example labels for bubbles
for i in range(len(employee_performance)):
    ax.text(employee_performance[i], happiness_scores[i], f'Emp {i+1}', fontsize=12, ha='right')

# Scale sizes to percentages
scaled_sizes = [size / max(sizes) * 100 for size in sizes]

# Create legend with matching colors and percentage labels
handles = [plt.Line2D([0], [0], marker='o', color='w', markerfacecolor=plt.cm.Greens(color / max(colors)), markersize=np.sqrt(size) / 1, label=f'{int(size)}%')
           for color, size in zip(colors, scaled_sizes)]
legend1 = ax.legend(handles=handles, title="Efficiency (%)", loc="center left", bbox_to_anchor=(1, 0.5), frameon=True, fontsize=10, labelspacing=2)
ax.add_artist(legend1)

# Define Taipy page content
page = """
<|toggle|theme|>

<center style="color: var(--taipy-primary); font-size: 2.5em; font-weight:bold">
  **Matplotlib**{: .color-primary} 2D Scatter Plot
</center>
This page contains an enhanced 2D scatter plot created with Matplotlib: 
<br/><br/>

<|part|content={fig}|>
"""

if __name__ == "__main__":
    Gui(page, css_file="styles.css").run(title="Chart-Scatter-Matplotlib")
