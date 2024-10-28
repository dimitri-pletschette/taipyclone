from taipy.gui import Gui
import matplotlib.pyplot as plt
import numpy as np
import mpld3

# Define data
employee_performance = [5, 4.8, 4.5, 4.2, 3.9, 3.7, 4.1, 4.6, 5.0, 4.3]
happiness_scores = [5, 4.5, 4.2, 4.0, 3.8, 3.9, 4.3, 4.7, 4.9, 4.4]

# Calculate sizes based on product of performance and happiness
sizes = [e * h * 50 for e, h in zip(employee_performance, happiness_scores)]
colors = sizes  # Color based on sizes

# Create the Matplotlib figure
fig, ax = plt.subplots(figsize=(12, 8))  # Adjust figsize for better height
scatter = ax.scatter(employee_performance, happiness_scores, s=sizes, c=colors, cmap="Greens", vmin=min(colors), vmax=max(colors))
ax.set(xlim=(1, 6), xticks=np.arange(1, 7), ylim=(1, 6), yticks=np.arange(1, 7))
ax.set_xlabel('Performance Score')
ax.set_ylabel('Happiness Index')
ax.set_title('Employee Performance vs. Happiness')

# Example labels for bubbles
for i in range(len(employee_performance)):
    ax.text(employee_performance[i], happiness_scores[i], f'Emp {i+1}', fontsize=9, ha='right')

# Create legend for bubble sizes
legend_labels = np.unique(np.round(sizes, decimals=-1))
for label in legend_labels:
    ax.scatter([], [], c='g', alpha=0.5, s=label, label=str(int(label)))

# Only one legend on the left side
legend1 = ax.legend(title="Bubble Size (Efficiency)", loc="upper left", frameon=True, fontsize=10)
ax.add_artist(legend1)

# Convert the plot to an interactive HTML
# html_str = mpld3.fig_to_html(fig)

# Define Taipy page content
page = """
# Enhanced 2D Scatter Plot

This page contains an enhanced 2D scatter plot created with Matplotlib:

<|part|content={fig}|height=600px>
"""

if __name__ == "__main__":
    Gui(page).run(title="Chart Scatter Matplotlib")
