/*
 * Function Name    : getMidPt
 * Parameter        : Point Array 
 * Return Type      : (pointArray)
 * Author           : sukyong, yoon
 * Date             : 2012-02-24
 * Descript         : 
 */
 function getMidPt(points)
{
    if (points.length > 0)
    {
    	var i = 0;
        var total_length = 0;
        for (i = 0; i < points.length - 1; i++)
        {
            total_length += Math.abs(points[i].X - points[i + 1].X);
            total_length += Math.abs(points[i].Y - points[i + 1].Y);
        }
        
        var midX, midY;
        var mid_length = total_length / 2;
        var length = 0;
        for (i = 0; i < points.length - 1; i++)
        {
            var ptBegin = points[i];
            var ptEnd = points[i + 1];

            var nGab = Math.abs(points[i].X - points[i + 1].X) + Math.abs(points[i].Y - points[i + 1].Y);
            length += nGab;

            if (mid_length <= length)
            {
                // Vertical 
                if (points[i].X == points[i + 1].X)
                {
                    if (ptBegin.Y > ptEnd.Y)
                    	midY = points[i].Y - Math.abs(mid_length - (length - nGab));
                    else
                    	midY = points[i].Y + Math.abs(mid_length - (length - nGab));

                    midX = points[i].X;

                }
                else	// Horizon
                {
                    if (points[i].X > points[i + 1].X)
                    	midX = points[i].X - Math.abs(mid_length - (length - nGab));
                    else
                    	midX = points[i].X + Math.abs(mid_length - (length - nGab));

                    midY = ptBegin.Y;
                }
                return [i + 1, midX, midY];
            }
        }
    }
    return [-1,0,0];
}
